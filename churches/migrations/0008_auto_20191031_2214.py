# Generated by Django 2.2.6 on 2019-10-31 22:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('churches', '0007_auto_20191031_2209'),
    ]

    operations = [
        migrations.AlterField(
            model_name='church',
            name='lat',
            field=models.FloatField(),
        ),
        migrations.AlterField(
            model_name='church',
            name='lng',
            field=models.FloatField(),
        ),
    ]
